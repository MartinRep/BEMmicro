package ie.gmit.bem.domain;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Message.class)
public abstract class Message_ {

	public static volatile SetAttribute<Message, Appointment> appointments;
	public static volatile SingularAttribute<Message, Long> id;
	public static volatile SingularAttribute<Message, Instant> time;
	public static volatile SingularAttribute<Message, String> content;

}

