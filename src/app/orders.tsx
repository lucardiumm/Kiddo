import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { CactusLM } from 'cactus-react-native';
import * as FileSystem from 'expo-file-system'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [lm, setLM] = useState<CactusLM | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    initializeModel();
    return () => {
      lm?.release();
    };
  }, []);

  const initializeModel = async () => {
    try {
      const modelUrl = 'https://huggingface.co/Lucaardium/finalModel/resolve/main/finalModel.gguf';
      const modelPath = await FileSystem.downloadAsync(modelUrl, FileSystem.cacheDirectory + 'models/');

      const { lm: model, error } = await CactusLM.init({
        model: FileSystem.cacheDirectory + 'models/finalModel.gguf',
        n_ctx: 2048,
        n_threads: 4,
        n_gpu_layers: 99,
      });

      if (error) throw error;
      setLM(model);
    } catch (error) {
      console.error('Failed to initialize model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!lm || !input.trim() || isGenerating) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setIsGenerating(true);

    try {
      let response = '';
      await lm.completion(newMessages, {
        n_predict: 200,
        temperature: 0.7,
        stop: ['</s>', '<|end|>'],
      }, (token) => {
        response += token.token;
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: response }
        ]);
      });
    } catch (error) {
      console.error('Generation failed:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Error generating response' }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>Loading model...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              backgroundColor: msg.role === 'user' ? '#007AFF' : '#ffffff',
              padding: 12,
              marginVertical: 4,
              borderRadius: 12,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text style={{ 
              color: msg.role === 'user' ? '#ffffff' : '#000000',
              fontSize: 16,
            }}>
              {msg.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: '#f8f8f8',
          }}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          multiline
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={isGenerating || !input.trim()}
          style={{
            backgroundColor: isGenerating ? '#cccccc' : '#007AFF',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginLeft: 8,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
            {isGenerating ? '...' : 'Send'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}