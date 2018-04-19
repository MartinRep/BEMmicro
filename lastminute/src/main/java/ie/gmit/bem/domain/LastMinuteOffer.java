package ie.gmit.bem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A LastMinuteOffer.
 */
@Entity
@Table(name = "last_minute_offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LastMinuteOffer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Double price;

    @Column(name = "jhi_user")
    private Integer user;

    @ManyToOne
    private LastMinuteService service;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public LastMinuteOffer price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getUser() {
        return user;
    }

    public LastMinuteOffer user(Integer user) {
        this.user = user;
        return this;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public LastMinuteService getService() {
        return service;
    }

    public LastMinuteOffer service(LastMinuteService lastMinuteService) {
        this.service = lastMinuteService;
        return this;
    }

    public void setService(LastMinuteService lastMinuteService) {
        this.service = lastMinuteService;
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
        LastMinuteOffer lastMinuteOffer = (LastMinuteOffer) o;
        if (lastMinuteOffer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lastMinuteOffer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LastMinuteOffer{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", user=" + getUser() +
            "}";
    }
}
