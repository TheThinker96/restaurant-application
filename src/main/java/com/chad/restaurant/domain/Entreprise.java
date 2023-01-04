package com.chad.restaurant.domain;

import com.chad.restaurant.domain.enumeration.EntrepriseStatut;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Entreprise implements Serializable {

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

    @Size(min = 4, max = 120)
    @Column(name = "adresse", length = 120)
    private String adresse;

    @NotNull
    @Size(min = 4, max = 60)
    @Column(name = "telephones", length = 60, nullable = false)
    private String telephones;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private EntrepriseStatut statut;

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "userAccounts", "entreprise" }, allowSetters = true)
    private Set<PointOfSale> pointOfSales = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produits", "entreprise" }, allowSetters = true)
    private Set<Section> sections = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "stockProduits", "venteProduits", "section", "entreprise" }, allowSetters = true)
    private Set<Produit> produits = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "venteProduits", "credits", "entreprise", "pointOfSale" }, allowSetters = true)
    private Set<UserAccount> userAccounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Entreprise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Entreprise name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResponsable() {
        return this.responsable;
    }

    public Entreprise responsable(String responsable) {
        this.setResponsable(responsable);
        return this;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getAdresse() {
        return this.adresse;
    }

    public Entreprise adresse(String adresse) {
        this.setAdresse(adresse);
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephones() {
        return this.telephones;
    }

    public Entreprise telephones(String telephones) {
        this.setTelephones(telephones);
        return this;
    }

    public void setTelephones(String telephones) {
        this.telephones = telephones;
    }

    public EntrepriseStatut getStatut() {
        return this.statut;
    }

    public Entreprise statut(EntrepriseStatut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(EntrepriseStatut statut) {
        this.statut = statut;
    }

    public Set<PointOfSale> getPointOfSales() {
        return this.pointOfSales;
    }

    public void setPointOfSales(Set<PointOfSale> pointOfSales) {
        if (this.pointOfSales != null) {
            this.pointOfSales.forEach(i -> i.setEntreprise(null));
        }
        if (pointOfSales != null) {
            pointOfSales.forEach(i -> i.setEntreprise(this));
        }
        this.pointOfSales = pointOfSales;
    }

    public Entreprise pointOfSales(Set<PointOfSale> pointOfSales) {
        this.setPointOfSales(pointOfSales);
        return this;
    }

    public Entreprise addPointOfSale(PointOfSale pointOfSale) {
        this.pointOfSales.add(pointOfSale);
        pointOfSale.setEntreprise(this);
        return this;
    }

    public Entreprise removePointOfSale(PointOfSale pointOfSale) {
        this.pointOfSales.remove(pointOfSale);
        pointOfSale.setEntreprise(null);
        return this;
    }

    public Set<Section> getSections() {
        return this.sections;
    }

    public void setSections(Set<Section> sections) {
        if (this.sections != null) {
            this.sections.forEach(i -> i.setEntreprise(null));
        }
        if (sections != null) {
            sections.forEach(i -> i.setEntreprise(this));
        }
        this.sections = sections;
    }

    public Entreprise sections(Set<Section> sections) {
        this.setSections(sections);
        return this;
    }

    public Entreprise addSection(Section section) {
        this.sections.add(section);
        section.setEntreprise(this);
        return this;
    }

    public Entreprise removeSection(Section section) {
        this.sections.remove(section);
        section.setEntreprise(null);
        return this;
    }

    public Set<Produit> getProduits() {
        return this.produits;
    }

    public void setProduits(Set<Produit> produits) {
        if (this.produits != null) {
            this.produits.forEach(i -> i.setEntreprise(null));
        }
        if (produits != null) {
            produits.forEach(i -> i.setEntreprise(this));
        }
        this.produits = produits;
    }

    public Entreprise produits(Set<Produit> produits) {
        this.setProduits(produits);
        return this;
    }

    public Entreprise addProduit(Produit produit) {
        this.produits.add(produit);
        produit.setEntreprise(this);
        return this;
    }

    public Entreprise removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.setEntreprise(null);
        return this;
    }

    public Set<UserAccount> getUserAccounts() {
        return this.userAccounts;
    }

    public void setUserAccounts(Set<UserAccount> userAccounts) {
        if (this.userAccounts != null) {
            this.userAccounts.forEach(i -> i.setEntreprise(null));
        }
        if (userAccounts != null) {
            userAccounts.forEach(i -> i.setEntreprise(this));
        }
        this.userAccounts = userAccounts;
    }

    public Entreprise userAccounts(Set<UserAccount> userAccounts) {
        this.setUserAccounts(userAccounts);
        return this;
    }

    public Entreprise addUserAccount(UserAccount userAccount) {
        this.userAccounts.add(userAccount);
        userAccount.setEntreprise(this);
        return this;
    }

    public Entreprise removeUserAccount(UserAccount userAccount) {
        this.userAccounts.remove(userAccount);
        userAccount.setEntreprise(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entreprise)) {
            return false;
        }
        return id != null && id.equals(((Entreprise) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Entreprise{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", telephones='" + getTelephones() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
