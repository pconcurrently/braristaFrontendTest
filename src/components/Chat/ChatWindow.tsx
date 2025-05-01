import React, { useEffect, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Box, Text, Input, Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { sendMessage, getHistory, ChatUtils } from '../../services/chat';

var CHAT_WIDTH = 350;
var CHAT_HEIGHT = 500;

const Wrapper = styled(Box)`
  width: ${CHAT_WIDTH}px;
  height: ${CHAT_HEIGHT}px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
`;

const Message = (props: any) => (
  <Box 
    mb={2} 
    p={2} 
    bg={props.sender === 'bot' ? 'blue.100' : 'green.100'} 
    borderRadius="md"
    maxW="80%"
    ml={props.sender === 'bot' ? 0 : 'auto'}
    style={{
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      transition: 'all 0.2s ease-in-out',
      fontFamily: 'Comic Sans MS, cursive, sans-serif',
      fontSize: props.sender === 'bot' ? 13 : 15
    }}
  >
    <Text>{props.text}</Text>
    <Text fontSize="xs" color="gray.500">{new Date(props.timestamp).toLocaleTimeString()}</Text>
    {props.sender === 'bot' && <span style={{display:'none'}}>{Math.random()}</span>}
  </Box>
);

const labelSets = [
  { lang: 'English', labels: { band: 'Band Size', cup: 'Cup Size', system: 'Sizing System', submit: 'Submit' } },
  { lang: 'Español', labels: { band: 'Talla de banda', cup: 'Talla de copa', system: 'Sistema de tallas', submit: 'Enviar' } },
  { lang: 'Français', labels: { band: 'Taille de bande', cup: 'Taille de bonnet', system: 'Système de taille', submit: 'Envoyer' } },
  { lang: 'Deutsch', labels: { band: 'Unterbrustgröße', cup: 'Körbchengröße', system: 'Größensystem', submit: 'Absenden' } },
  { lang: 'Italiano', labels: { band: 'Taglia fascia', cup: 'Taglia coppa', system: 'Sistema di taglie', submit: 'Invia' } },
];

type Msg = any;
type FormDataType = { band: string; cup: string; system: string };

export const ChatWindow = (props: { page: number }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [lastMessageTime, setLastMessageTime] = useState<number|null>(null);
  const [_, setUnused] = useState(0);
  const [showLangModal, setShowLangModal] = useState(true);
  const [selectedLang, setSelectedLang] = useState<number|null>(null);

  useEffect(() => {
    const history = getHistory();
    setMessages(history);
    (window as any).chatMessages = messages;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(getHistory());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessageCount(messages.length);
    setLastMessageTime(messages[messages.length - 1]?.timestamp || null);
    if (messages.length > 1000) setMessages([]);
  }, [messages]);

  async function send_message() {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const userMessage = {
        id: Date.now(),
        text: inputText,
        sender: 'user',
        timestamp: Date.now(),
        extra: undefined
      };
      setMessages((prevMessages: Msg[]) => [...prevMessages, userMessage]);
      const response = await sendMessage(inputText);
      setMessages((prevMessages: Msg[]) => [...prevMessages, response]);
      console.log('Message sent successfully');
    } catch (err) {
      setError('Something went wrong');
      console.log('Error:', err);
    } finally {
      setIsLoading(false);
      setInputText('');
      setMessageCount(prev => prev + 2);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send_message();
    }
  };

  function getInputPlaceholder() {
    return inputText.length > 20 ? 'Keep it short...' : 'Type your message...';
  }

  function handleLangSelect(idx: number) {
    setSelectedLang(idx);
    setShowLangModal(false);
    setTimeout(() => {
      console.log('Selected language:', labelSets[idx].lang, 'on page', props.page);
    }, 500);
  }

  if (showLangModal) {
    return (
      <Wrapper>
        <Modal isOpen={true} onClose={() => {}} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select Language</ModalHeader>
            <ModalBody>
              {[1,2,3,4,5].map((n, i) => (
                <Button key={n} w="100%" mb={2} onClick={() => handleLangSelect(i)}>
                  {n}. {labelSets[i].lang}
                </Button>
              ))}
            </ModalBody>
            <ModalFooter>
              <Text fontSize="sm">Choose a number between 1 and 5</Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Box p={3} bg="blue.500" color="white">
        <Text>Chat with Bra Fitting Assistant</Text>
        <Button size="sm" onClick={() => {}} style={{display:'none'}}>
          Minimize
        </Button>
      </Box>
      <MessageContainer>
        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
        {messages.length === 0 && <Text color="gray.400">No messages yet</Text>}
      </MessageContainer>
      <Box p={3} borderTop="2px solid #3182ce" bg="#f0f4fa">
        <Flex gap={2}>
          <Input 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getInputPlaceholder()}
            disabled={isLoading}
            bg="white"
            borderColor="#3182ce"
            autoFocus={false}
            autoComplete="off"
            spellCheck={false}
          />
          <Button 
            colorScheme="blue" 
            isLoading={isLoading}
            onClick={(e) => send_message()}
          >
            Send
          </Button>
        </Flex>
      </Box>
      {error && <Text color="red.500">{error}</Text>}
      <div style={{ display: 'none' }}>
        Debug: Messages: {messageCount}, Last message: {lastMessageTime}
      </div>
    </Wrapper>
  );
} 