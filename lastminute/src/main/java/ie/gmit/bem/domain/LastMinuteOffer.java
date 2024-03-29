package ie.gmit.bem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A LastMinuteOffer.
 */
@Entity
@Table(name = "last_minute_offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "lastminuteoffer")
public class LastMinuteOffer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_profile")
    private String profile;

    @ManyToOne
    private LastMinuteService lastMinuteService;

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

    public LastMinuteOffer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfile() {
        return profile;
    }

    public LastMinuteOffer profile(String profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public LastMinuteService getLastMinuteService() {
        return lastMinuteService;
    }

    public LastMinuteOffer lastMinuteService(LastMinuteService lastMinuteService) {
        this.lastMinuteService = lastMinuteService;
        return this;
    }

    public void setLastMinuteService(LastMinuteService lastMinuteService) {
        this.lastMinuteService = lastMinuteService;
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
            ", name='" + getName() + "'" +
            ", profile='" + getProfile() + "'" +
            "}";
    }
}
