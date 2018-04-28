package ie.gmit.bem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A LastMinuteService.
 */
@Entity
@Table(name = "last_minute_service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "lastminuteservice")
public class LastMinuteService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "category", nullable = false)
    private Integer category;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "available")
    private ZonedDateTime available;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "jhi_profile")
    private String profile;

    @OneToMany(mappedBy = "lastMinuteService")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LastMinuteOffer> lastminuteOffers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCategory() {
        return category;
    }

    public LastMinuteService category(Integer category) {
        this.category = category;
        return this;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public LastMinuteService description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getAvailable() {
        return available;
    }

    public LastMinuteService available(ZonedDateTime available) {
        this.available = available;
        return this;
    }

    public void setAvailable(ZonedDateTime available) {
        this.available = available;
    }

    public String getLocation() {
        return location;
    }

    public LastMinuteService location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public byte[] getImage() {
        return image;
    }

    public LastMinuteService image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public LastMinuteService imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getProfile() {
        return profile;
    }

    public LastMinuteService profile(String profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Set<LastMinuteOffer> getLastminuteOffers() {
        return lastminuteOffers;
    }

    public LastMinuteService lastminuteOffers(Set<LastMinuteOffer> lastMinuteOffers) {
        this.lastminuteOffers = lastMinuteOffers;
        return this;
    }

    public LastMinuteService addLastminuteOffer(LastMinuteOffer lastMinuteOffer) {
        this.lastminuteOffers.add(lastMinuteOffer);
        lastMinuteOffer.setLastMinuteService(this);
        return this;
    }

    public LastMinuteService removeLastminuteOffer(LastMinuteOffer lastMinuteOffer) {
        this.lastminuteOffers.remove(lastMinuteOffer);
        lastMinuteOffer.setLastMinuteService(null);
        return this;
    }

    public void setLastminuteOffers(Set<LastMinuteOffer> lastMinuteOffers) {
        this.lastminuteOffers = lastMinuteOffers;
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
            ", category=" + getCategory() +
            ", description='" + getDescription() + "'" +
            ", available='" + getAvailable() + "'" +
            ", location='" + getLocation() + "'" +
            ", price=" + getPrice() +
            ", address='" + getAddress() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", profile='" + getProfile() + "'" +
            "}";
    }
}
