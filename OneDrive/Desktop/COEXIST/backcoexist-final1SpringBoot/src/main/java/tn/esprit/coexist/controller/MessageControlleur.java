package tn.esprit.coexist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coexist.entity.Message;
import tn.esprit.coexist.service.Message.MessageService;

@RestController
@CrossOrigin("http://localhost:4200")
public class MessageControlleur {
    @Autowired
    MessageService messageService;


    @PostMapping("/Message/add/{idroom}/{idu}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public Message add(@RequestBody Message m, @PathVariable("idroom") Integer idroom, @PathVariable("idu") Integer idu){
        return messageService.AddMessage(m,idroom,idu);
    }

    @PostMapping("/Message/update")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public Message update(@RequestBody Message m){
        return messageService.UpdateMessage(m);
    }

    @DeleteMapping("/Message/remove/{id}")
    @CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
    public void remove(@PathVariable("id") Integer id){
        messageService.removeMessage(id);
    }
}
