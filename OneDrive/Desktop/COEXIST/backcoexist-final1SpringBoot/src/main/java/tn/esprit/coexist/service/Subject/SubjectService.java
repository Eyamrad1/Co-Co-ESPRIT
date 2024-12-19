package tn.esprit.coexist.service.Subject;


import tn.esprit.coexist.entity.User;

import java.util.List;

public interface SubjectService  <Class,TypeId>{

    List<Class> findAll();

    Class retrieveItem(TypeId idItem);
    Class add(Class class1) ;

    void delete(TypeId id);

    Class update(Class Classe1);
    Class nocomment(Class Classe1);
    Class ban(Class Classe1);
    List<Class> getSubjectsOrderByCommentAndReact();
    List<Class> findallbanned(Integer id);
    List<Class> findAlladmin();
}
