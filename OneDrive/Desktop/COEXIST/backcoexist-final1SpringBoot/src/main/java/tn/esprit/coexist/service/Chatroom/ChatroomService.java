package tn.esprit.coexist.service.Chatroom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coexist.entity.Chatroom;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.repository.ChatroomRepo;
import tn.esprit.coexist.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatroomService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatroomRepo chatroomRepo;

    public Chatroom addChatroom(Chatroom c, Integer id){
        Optional<User> u=userRepository.findById(id);
        if(u.isPresent()){
            c.setOwner(u.get());
            return chatroomRepo.save(c);
        }
        return null;
    }
    public Chatroom updateChatroom(Chatroom c){
        Optional<Chatroom> chatroomOptional=chatroomRepo.findById(c.getChatRoomId());
        if(chatroomOptional.isPresent()){
            c.setOwner(chatroomOptional.get().getOwner());
            return chatroomRepo.save(c);
        }
        return null;
    }

    public Chatroom invite(List<Integer>ids,Integer idroom){
        List<User> users=new ArrayList<>();
        Optional<Chatroom> chatroomOptional=chatroomRepo.findById(idroom);
        if(chatroomOptional.isPresent()){
            for (Integer id : ids) {
                Optional<User> u=userRepository.findById(id);
                if(u.isPresent()){
                    users.add(u.get());
                }
            }
            chatroomOptional.get().setUsers(users);
            return chatroomRepo.save(chatroomOptional.get());
        }
        return null;
    }

    public Chatroom joindre(Integer idu,Integer idroom){
        Optional<Chatroom> chatroomOptional=chatroomRepo.findById(idroom);
        if(chatroomOptional.isPresent()){
            Optional<User> u=userRepository.findById(idu);
            if(u.isPresent()){
                if(chatroomOptional.get().isStatus()){
                    Chatroom chatroom = chatroomOptional.get();
                    List<User> users = chatroom.getUsers();
                    users.add(u.get());
                    chatroom.setUsers(users);
                    return chatroomRepo.save(chatroom);
                }
            }

        }
        return null;
    }
    public List<User> UsersList(){
        return userRepository.findAll();
    }
    public List<Chatroom> ListChatroom(){
        return chatroomRepo.findAll();
    }
    public void removechatromm(Integer id){
        chatroomRepo.deleteById(id);
    }
    public String usernameuser(Integer id){
        return userRepository.findById(id).get().getUsername();
    }
}
