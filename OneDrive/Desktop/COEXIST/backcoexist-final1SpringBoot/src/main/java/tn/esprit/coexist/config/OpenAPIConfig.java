package tn.esprit.coexist.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class OpenAPIConfig {
  /*  @AfterReturning(value = "execution(* tn.esprit.coexist.service.*(String))")
    void journal(JoinPoint joinPoint){
        String name=joinPoint.getSignature().getName();
        log.info("La methode "+name+" a utilise un string comme parametre");
    }*/
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(infoAPI());
    }
    public Info infoAPI() {
        return new Info().title("Pidev Spring Angular")
                .description("Pidev Sprint 1")
                .contact(contactAPI());
    }
    public Contact contactAPI() {
        Contact contact = new Contact().name("Equipe COEXIST")
                .email("abdessalem.lasswed@esprit.tn")
                .url("https://www.linkedin.com/in/**********/");
        return contact;
    }

}
