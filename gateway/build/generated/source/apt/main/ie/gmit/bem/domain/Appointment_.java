package ie.gmit.bem.domain;

import java.time.ZonedDateTime;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Appointment.class)
public abstract class Appointment_ {

	public static volatile SingularAttribute<Appointment, String> address;
	public static volatile SingularAttribute<Appointment, String> name;
	public static volatile SetAttribute<Appointment, Profile> profiles;
	public static volatile SetAttribute<Appointment, Message> messages;
	public static volatile SingularAttribute<Appointment, Long> id;
	public static volatile SingularAttribute<Appointment, ZonedDateTime> time;
	public static volatile SetAttribute<Appointment, Categories> categories;

}

