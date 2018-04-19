package ie.gmit.bem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @Column(name = "price")
    private Double price;

    @Column(name = "jhi_user")
    private Integer user;

    @ManyToOne
    private Request request;

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

    public Offer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public Offer time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Double getPrice() {
        return price;
    }

    public Offer price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getUser() {
        return user;
    }

    public Offer user(Integer user) {
        this.user = user;
        return this;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public Request getRequest() {
        return request;
    }

    public Offer request(Request request) {
        this.request = request;
        return this;
    }

    public void setRequest(Request request) {
        this.request = request;
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
        Offer offer = (Offer) o;
        if (offer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", time='" + getTime() + "'" +
            ", price=" + getPrice() +
            ", user=" + getUser() +
            "}";
    }
}
