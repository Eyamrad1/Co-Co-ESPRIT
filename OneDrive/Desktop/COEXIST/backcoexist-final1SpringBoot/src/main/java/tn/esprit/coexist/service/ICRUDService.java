package tn.esprit.coexist.service;

import java.util.List;

public interface ICRUDService <Class,TypeId>{
    List<Class> findAll();

    Class retrieveItem(TypeId idItem);
    Class add(Class class1) ;

    void delete(TypeId id);

    Class update(TypeId id,Class Classe1);


}
