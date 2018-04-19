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
 * A LastMinuteService.
 */
@Entity
@Table(name = "last_minute_service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LastMinuteService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @Column(name = "price")
    private Double price;

    @Column(name = "address")
    private String address;

    @Column(name = "jhi_user")
    private Integer user;

    @OneToMany(mappedBy = "service")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LastMinuteOffer> purchases = new HashSet<>();

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

    public LastMinuteService category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public LastMinuteService name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public LastMinuteService time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Double getPrice() {
        return price;
    }

    public LastMinuteService price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAddress() {
        return address;
    }

    public LastMinuteService address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getUser() {
        return user;
    }

    public LastMinuteService user(Integer user) {
        this.user = user;
        return this;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public Set<LastMinuteOffer> getPurchases() {
        return purchases;
    }

    public LastMinuteService purchases(Set<LastMinuteOffer> lastMinuteOffers) {
        this.purchases = lastMinuteOffers;
        return this;
    }

    public LastMinuteService addPurchase(LastMinuteOffer lastMinuteOffer) {
        this.purchases.add(lastMinuteOffer);
        lastMinuteOffer.setService(this);
        return this;
    }

    public LastMinuteService removePurchase(LastMinuteOffer lastMinuteOffer) {
        this.purchases.remove(lastMinuteOffer);
        lastMinuteOffer.setService(null);
        return this;
    }

    public void setPurchases(Set<LastMinuteOffer> lastMinuteOffers) {
        this.purchases = lastMinuteOffers;
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
        LastMinuteService lastMinuteService = (LastMinuteService) o;
        if (lastMinuteService.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lastMinuteService.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LastMinuteService{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", name='" + getName() + "'" +
            ", time='" + getTime() + "'" +
            ", price=" + getPrice() +
            ", address='" + getAddress() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
