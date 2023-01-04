package com.chad.restaurant.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PointOfSale.
 */
@Entity
@Table(name = "point_of_sale")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PointOfSale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 4, max = 60)
    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @NotNull
    @Size(min = 4, max = 60)
    @Column(name = "responsable", length = 60, nullable = false)
    private String responsable;

    @NotNull
    @Size(min = 4, max = 60)
    @Column(name = "adresse", length = 60, nullable = false)
    private String adresse;

    @OneToMany(mappedBy = "pointOfSale")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "venteProduits", "credits", "entreprise", "pointOfSale" }, allowSetters = true)
    private Set<UserAccount> userAccounts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "pointOfSales", "sections", "produits", "userAccounts" }, allowSetters = true)
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PointOfSale id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public PointOfSale name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResponsable() {
        return this.responsable;
    }

    public PointOfSale responsable(String responsable) {
        this.setResponsable(responsable);
        return this;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public PointOfSale adresse(String adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Set<UserAccount> getUserAccounts() {
        return this.userAccounts;
    }

    public void setUserAccounts(Set<UserAccount> userAccounts) {
        if (this.userAccounts != null) {
            this.userAccounts.forEach(i -> i.setPointOfSale(null));
        }
        if (userAccounts != null) {
            userAccounts.forEach(i -> i.setPointOfSale(this));
        }
        this.userAccounts = userAccounts;
    }

    public PointOfSale userAccounts(Set<UserAccount> userAccounts) {
        this.setUserAccounts(userAccounts);
        return this;
    }

    public PointOfSale addUserAccount(UserAccount userAccount) {
        this.userAccounts.add(userAccount);
        userAccount.setPointOfSale(this);
        return this;
    }

    public PointOfSale removeUserAccount(UserAccount userAccount) {
        this.userAccounts.remove(userAccount);
        userAccount.setPointOfSale(null);
        return this;
    }

    public Entreprise getEntreprise() {
        return this.entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public PointOfSale entreprise(Entreprise entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PointOfSale)) {
            return false;
        }
        return id != null && id.equals(((PointOfSale) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PointOfSale{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
