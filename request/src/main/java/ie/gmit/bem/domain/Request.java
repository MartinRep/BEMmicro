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

import ie.gmit.bem.domain.enumeration.Category;

/**
 * A Request.
 */
@Entity
@Table(name = "request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "name")
    private String name;

    @Column(name = "duration")
    private ZonedDateTime duration;

    @Column(name = "exp_price")
    private Double expPrice;

    @Column(name = "jhi_user")
    private Integer user;

    @OneToMany(mappedBy = "request")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Offer> offers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public Request category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public Request name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getDuration() {
        return duration;
    }

    public Request duration(ZonedDateTime duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(ZonedDateTime duration) {
        this.duration = duration;
    }

    public Double getExpPrice() {
        return expPrice;
    }

    public Request expPrice(Double expPrice) {
        this.expPrice = expPrice;
        return this;
    }

    public void setExpPrice(Double expPrice) {
        this.expPrice = expPrice;
    }

    public Integer getUser() {
        return user;
    }

    public Request user(Integer user) {
        this.user = user;
        return this;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public Request offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public Request addOffer(Offer offer) {
        this.offers.add(offer);
        offer.setRequest(this);
        return this;
    }

    public Request removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.setRequest(null);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
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
        Request request = (Request) o;
        if (request.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), request.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", name='" + getName() + "'" +
            ", duration='" + getDuration() + "'" +
            ", expPrice=" + getExpPrice() +
            ", user=" + getUser() +
            "}";
    }
}
