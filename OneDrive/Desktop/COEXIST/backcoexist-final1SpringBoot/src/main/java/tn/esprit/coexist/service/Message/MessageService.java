package tn.esprit.coexist.service.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Chatroom;
import tn.esprit.coexist.entity.Message;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ChatroomRepo;
import tn.esprit.coexist.repository.MessageRepo;
import tn.esprit.coexist.repository.UserRepository;

import java.util.Date;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatroomRepo chatroomRepo;
    @Autowired
    private MessageRepo messageRepo;

    public Message AddMessage(Message m,Integer idroom,Integer idu){
        Optional<Chatroom> c=chatroomRepo.findById(idroom);
        if(c.isPresent()){
            Optional<User> u=userRepository.findById(idu);
            if(u.isPresent()){
                m.setChatroom(c.get());
                m.setUser(u.get());
                m.setDateTime(new Date());
                return messageRepo.save(m);
            }
        }
        return null;
    }
    public Message UpdateMessage(Message m){
        Optional<Message>optionalMessage=messageRepo.findById(m.getMessageId());
        if(optionalMessage.isPresent()){
            optionalMessage.get().setContent(m.getContent());
            optionalMessage.get().setDateTime(new Date());
            return messageRepo.save(optionalMessage.get());
        }
        return null;
    }
    public void removeMessage(Integer id){
        messageRepo.deleteById(id);
    }
}
