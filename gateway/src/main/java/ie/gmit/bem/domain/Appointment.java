package ie.gmit.bem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Appointment.
 */
@Entity
@Table(name = "appointment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @OneToMany(mappedBy = "appointment")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Categories> categories = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "appointment_profile",
               joinColumns = @JoinColumn(name="appointments_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="profiles_id", referencedColumnName="id"))
    private Set<Profile> profiles = new HashSet<>();

    @OneToMany(mappedBy = "appointment")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> messages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Appointment name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Appointment address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public Appointment time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Set<Categories> getCategories() {
        return categories;
    }

    public Appointment categories(Set<Categories> categories) {
        this.categories = categories;
        return this;
    }

    public Appointment addCategories(Categories categories) {
        this.categories.add(categories);
        categories.setAppointment(this);
        return this;
    }

    public Appointment removeCategories(Categories categories) {
        this.categories.remove(categories);
        categories.setAppointment(null);
        return this;
    }

    public void setCategories(Set<Categories> categories) {
        this.categories = categories;
    }

    public Set<Profile> getProfiles() {
        return profiles;
    }

    public Appointment profiles(Set<Profile> profiles) {
        this.profiles = profiles;
        return this;
    }

    public Appointment addProfile(Profile profile) {
        this.profiles.add(profile);
        profile.getAppointments().add(this);
        return this;
    }

    public Appointment removeProfile(Profile profile) {
        this.profiles.remove(profile);
        profile.getAppointments().remove(this);
        return this;
    }

    public void setProfiles(Set<Profile> profiles) {
        this.profiles = profiles;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Appointment messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Appointment addMessage(Message message) {
        this.messages.add(message);
        message.setAppointment(this);
        return this;
    }

    public Appointment removeMessage(Message message) {
        this.messages.remove(message);
        message.setAppointment(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Appointment appointment = (Appointment) o;
        if (appointment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", time='" + getTime() + "'" +
            "}";
    }
}
