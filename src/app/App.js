'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MainContainer, ChatContainer, MessageList, MessageGroup, Message, Button, Avatar, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import logo from './assets/images/logo-sos-pharma.png';
import $ from 'jquery';
import Popper from 'popper.js';
import { steps } from './configs/Steps';

const App = () => {
  const [prevStep, setPrevStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [chatMessages, setChatMessages] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    const interval = setInterval(async () => {
      const indexMessage = steps.findLastIndex((m) => m.id == currentStep);
      const message = steps[indexMessage];

      if (message !== undefined) {
        if (message.sender === "ChatPharma") {
          setChatMessages((messages) => [...messages, message]);
          setPrevStep(message.id);
          setCurrentStep(message.target);
        }

        if (message.item === "input" && message.item === "search") {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [currentStep]);

  const showModal = (chatModal) => {
    const target = $(chatModal);
    target.on('shown.bs.modal', function (event) {
    });
    target.modal('show');
  };

  const hideModal = (chatModal) => {
    const target = $(chatModal);
    target.on('hidden.bs.modal', function (event) {
    });
    target.modal('hide');
  };

  const handleChatMessage = async (chatMessage) => {
    chatMessage = chatMessage.trim();
    const indexPrevMessage = steps.findLastIndex((m) => m.id == prevStep);
    const prevMessage = steps[indexPrevMessage];
    const indexMessage = steps.findLastIndex((m) => m.id == currentStep);
    const message = steps[indexMessage];
    if (message !== undefined) {
      if (prevMessage !== undefined) {
        if (message.sender !== "ChatPharma") {
          if (prevMessage.validator(chatMessage, prevMessage.options)) {
            setChatMessages((messages) => [...messages, {...message, message: chatMessage}]);
            if (prevMessage.item === "callback") {
              const target = prevMessage.options.find((m) => m.message == chatMessage).target;
              const id = steps.filter((m) => m.target == target).id;
              setPrevStep(id);
              setCurrentStep(target);
            } else {
              setPrevStep(message.id);
              setCurrentStep(message.target);
            }
            if (message.item === "search") {
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
          } else {
            message.message = chatMessage;
            setChatMessages((messages) => [...messages, message, prevMessage]);
            if (message.item === "search") {
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
          }
        }
      }
    }
  };

  const handleSearchMessage = async (chatMessage) => {
    chatMessage = chatMessage.trim();
    const indexPrevMessage = steps.findLastIndex((m) => m.id == prevStep);
    const prevMessage = steps[indexPrevMessage];
    if (prevMessage !== undefined) {
      if (prevMessage.sender === "ChatPharma") {
        if (prevMessage.item === "search") {
          const n = 10;
          if (chatMessage === "" || chatMessage.length < 3) {
            prevMessage.results = [];
          } else {
            prevMessage.results = prevMessage.options.filter((m) => m.message.toLowerCase().includes(chatMessage.toLowerCase()));
          }
          if (prevMessage.results.length > n) {
            prevMessage.results = prevMessage.results.slice(0, n);
          }
          setChatMessages((messages) => {
            const index = messages.findLastIndex((m) => m.id == prevMessage.id);
            if (index !== -1) {
              messages[index] = prevMessage;
            }
            return [...messages];
          });
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 py-5">
          <h6 className="text-success">SOS Pharma</h6>
          <h2 className="mt-4">Livraison de médicaments à domicile</h2>
          <p className="mt-4 text-muted">Commandez vos médicaments en toute confiance et recevez-les rapidement chez vous avec SOS Pharma. Fini les longues files d'attente à la pharmacie! Avec SOS Pharma, commandez vos médicaments en ligne et recevez-les directement chez vous, en toute confiance et rapidement.</p>
        </div>
        <div className="col-md-5 py-5">
          <div className="card border-success">
            <div className="card-header bg-success text-white">
              <img src={logo.src} width="40" alt="" /> <span>SOS Pharma</span>
            </div>
            <div className="card-body bg-transparent" style={{ position: "relative", height: "50vh" }}>
              <MainContainer>
                <ChatContainer>
                  <MessageList>
                    {chatMessages.map((message, i) => {
                      return message.sender === "ChatPharma" ? (
                        message.item === "list" || message.item === "callback" ? (
                          <div className="d-flex justify-content-start message-group" key={i}>
                            <MessageGroup direction="incoming">
                              <MessageGroup.Messages>
                                <div className="d-flex justify-content-start">
                                  <Avatar
                                    name="ChatPharma"
                                    size="md"
                                    src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                                    status="available"
                                  />
                                  <Message
                                    model={message}
                                  />
                                </div>
                                {message.options.map((m, j) => {
                                  return <div className="d-flex justify-content-start" key={j}>
                                    <Button
                                      border
                                      className={m.class}
                                      onClick={(event) => {
                                        handleChatMessage(event.target.innerText);
                                      }}
                                    >{m.message}</Button>
                                  </div>
                                })}
                              </MessageGroup.Messages>
                            </MessageGroup>
                          </div>
                        ) : (
                          message.item === "search" ? (
                            <div className="d-flex justify-content-start message-group" key={i}>
                              <MessageGroup direction="incoming">
                                <MessageGroup.Messages>
                                  <div className="d-flex justify-content-start">
                                    <Avatar
                                      name="ChatPharma"
                                      size="md"
                                      src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                                      status="available"
                                    />
                                    <Message
                                      model={message}
                                    />
                                  </div>
                                  {message.results.map((m, j) => {
                                    return <div className="d-flex justify-content-start" key={j}>
                                      <Button
                                        border
                                        className={m.class}
                                        onClick={(event) => {
                                          handleChatMessage(event.target.innerText);
                                        }}
                                      >{m.message}</Button>
                                    </div>
                                  })}
                                </MessageGroup.Messages>
                              </MessageGroup>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-start" key={i}>
                              <Avatar
                                name="ChatPharma"
                                size="md"
                                src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                                status="available"
                              />
                              <Message
                                model={message}
                              />
                            </div>
                          )
                        )
                      ) : (
                        <div className="d-flex justify-content-end" key={i}>
                          <Message
                            model={message}
                          />
                          <Avatar
                            name="UserPharma"
                            size="md"
                            src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                            status="available"
                          />
                        </div>
                      );
                    })}
                  </MessageList>
                  <MessageInput
                    attachButton={false}
                    autoFocus={true}
                    placeholder="Tapez le message ici"
                    ref={inputRef}
                    onChange={(_, message) => {
                      handleSearchMessage(message);
                    }}
                    onSend={(_, message) => {
                      handleChatMessage(message);
                    }}
                  />
                </ChatContainer>
              </MainContainer>
            </div>
            {/* <div className="card-footer bg-transparent border-success">
              <p>2 days ago</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="modal fade" id="chatModal" tabIndex="-1" aria-labelledby="chatModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="chatModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(event) => {
                      hideModal('#chatModal');
                    }}
                  >Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
