package tn.esprit.coexist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Chatroom;
import tn.esprit.coexist.entity.User;
import tn.esprit.coexist.service.Chatroom.ChatroomService;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class ChatroomControlleur {
    @Autowired
    ChatroomService chatroomService;

    @PostMapping("/Chatroom/add/{id}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public Chatroom add(@RequestBody Chatroom c, @PathVariable("id") Integer id){
        return chatroomService.addChatroom(c,id);
    }

    @PostMapping("/Chatroom/update")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public Chatroom update(@RequestBody Chatroom c){
        return chatroomService.updateChatroom(c);
    }

    @PostMapping("/Chatroom/invite/{idroom}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public Chatroom invite(@RequestBody List<Integer> ids, @PathVariable("idroom") Integer idroom){
        return chatroomService.invite(ids,idroom);
    }

    @PutMapping("/Chatroom/joindre/{idu}/{idroom}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public Chatroom joindre(@PathVariable("idu") Integer idu, @PathVariable("idroom") Integer idroom){
        return chatroomService.joindre(idu,idroom);
    }

    @GetMapping("/Chatroom/AllUsers")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public List<User> listUsers(){
        return chatroomService.UsersList();
    }
    @GetMapping("/Chatroom/AllChatroom")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public List<Chatroom> AllChatroom(){
        return chatroomService.ListChatroom();
    }

    @DeleteMapping("/Chatroom/Delete/{id}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public void Delete(@PathVariable("id") Integer id){
        chatroomService.removechatromm(id);
    }
    @GetMapping("/Chatroom/getusername/{id}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public String username(@PathVariable("id") Integer id){
        return chatroomService.usernameuser(id);
    }
}
