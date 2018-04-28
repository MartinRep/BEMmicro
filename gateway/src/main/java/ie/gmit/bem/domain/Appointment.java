package ie.gmit.bem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
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
@Document(indexName = "appointment")
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

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

    @ManyToOne
    private Category category;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "appointment_profile",
               joinColumns = @JoinColumn(name="appointments_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="profiles_id", referencedColumnName="id"))
    private Set<Profile> profiles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "appointment_message",
               joinColumns = @JoinColumn(name="appointments_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="messages_id", referencedColumnName="id"))
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

    public Location getLocation() {
        return location;
    }

    public Appointment location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public Appointment category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
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
        return this;
    }

    public Appointment removeProfile(Profile profile) {
        this.profiles.remove(profile);
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
        return this;
    }

    public Appointment removeMessage(Message message) {
        this.messages.remove(message);
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
