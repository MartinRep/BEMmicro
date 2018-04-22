package ie.gmit.bem.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Categories.
 */
@Entity
@Table(name = "categories")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Categories implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category")
    private String category;

    @ManyToOne
    private Appointment appointment;

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

    public Categories category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public Categories appointment(Appointment appointment) {
        this.appointment = appointment;
        return this;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
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
        Categories categories = (Categories) o;
        if (categories.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categories.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Categories{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
