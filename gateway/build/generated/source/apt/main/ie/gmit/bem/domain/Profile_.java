package ie.gmit.bem.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Profile.class)
public abstract class Profile_ {

	public static volatile SetAttribute<Profile, Appointment> appointments;
	public static volatile SingularAttribute<Profile, String> name;
	public static volatile SingularAttribute<Profile, String> phNumber;
	public static volatile SingularAttribute<Profile, Location> location;
	public static volatile SingularAttribute<Profile, Long> id;
	public static volatile SetAttribute<Profile, Category> categories;
	public static volatile SingularAttribute<Profile, String> pictureContentType;
	public static volatile SingularAttribute<Profile, User> user;
	public static volatile SingularAttribute<Profile, byte[]> picture;

}

