package ie.gmit.bem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Request.
 */
@Entity
@Table(name = "request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "request")
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "category", nullable = false)
    private String category;

    @NotNull
    @Column(name = "region", nullable = false)
    private String region;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "duration")
    private ZonedDateTime duration;

    @Column(name = "exp_price")
    private Double expPrice;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @NotNull
    @Column(name = "jhi_profile", nullable = false)
    private String profile;

    @Column(name = "posted")
    private Instant posted;

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

    public String getCategory() {
        return category;
    }

    public Request category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRegion() {
        return region;
    }

    public Request region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDescription() {
        return description;
    }

    public Request description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public byte[] getImage() {
        return image;
    }

    public Request image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Request imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getProfile() {
        return profile;
    }

    public Request profile(String profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Instant getPosted() {
        return posted;
    }

    public Request posted(Instant posted) {
        this.posted = posted;
        return this;
    }

    public void setPosted(Instant posted) {
        this.posted = posted;
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
            ", region='" + getRegion() + "'" +
            ", description='" + getDescription() + "'" +
            ", duration='" + getDuration() + "'" +
            ", expPrice=" + getExpPrice() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", profile='" + getProfile() + "'" +
            ", posted='" + getPosted() + "'" +
            "}";
    }
}
