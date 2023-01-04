package com.chad.restaurant.domain;

import com.chad.restaurant.domain.enumeration.Role;
import com.chad.restaurant.domain.enumeration.Sexe;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UserAccount.
 */
@Entity
@Table(name = "user_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 4, max = 60)
    @Column(name = "nom", length = 60, nullable = false)
    private String nom;

    @NotNull
    @Size(min = 4, max = 60)
    @Column(name = "prenom", length = 60, nullable = false)
    private String prenom;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexe")
    private Sexe sexe;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @NotNull
    @Size(min = 8, max = 30)
    @Column(name = "telephone", length = 30, nullable = false)
    private String telephone;

    @OneToMany(mappedBy = "userAccount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "stockProduit", "userAccount" }, allowSetters = true)
    private Set<VenteProduit> venteProduits = new HashSet<>();

    @OneToMany(mappedBy = "userAccount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "userAccount" }, allowSetters = true)
    private Set<Credit> credits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "pointOfSales", "sections", "produits", "userAccounts" }, allowSetters = true)
    private Entreprise entreprise;

    @ManyToOne
    @JsonIgnoreProperties(value = { "userAccounts", "entreprise" }, allowSetters = true)
    private PointOfSale pointOfSale;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserAccount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public UserAccount nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public UserAccount prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Sexe getSexe() {
        return this.sexe;
    }

    public UserAccount sexe(Sexe sexe) {
        this.setSexe(sexe);
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public Role getRole() {
        return this.role;
    }

    public UserAccount role(Role role) {
        this.setRole(role);
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public UserAccount telephone(String telephone) {
        this.setTelephone(telephone);
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Set<VenteProduit> getVenteProduits() {
        return this.venteProduits;
    }

    public void setVenteProduits(Set<VenteProduit> venteProduits) {
        if (this.venteProduits != null) {
            this.venteProduits.forEach(i -> i.setUserAccount(null));
        }
        if (venteProduits != null) {
            venteProduits.forEach(i -> i.setUserAccount(this));
        }
        this.venteProduits = venteProduits;
    }

    public UserAccount venteProduits(Set<VenteProduit> venteProduits) {
        this.setVenteProduits(venteProduits);
        return this;
    }

    public UserAccount addVenteProduit(VenteProduit venteProduit) {
        this.venteProduits.add(venteProduit);
        venteProduit.setUserAccount(this);
        return this;
    }

    public UserAccount removeVenteProduit(VenteProduit venteProduit) {
        this.venteProduits.remove(venteProduit);
        venteProduit.setUserAccount(null);
        return this;
    }

    public Set<Credit> getCredits() {
        return this.credits;
    }

    public void setCredits(Set<Credit> credits) {
        if (this.credits != null) {
            this.credits.forEach(i -> i.setUserAccount(null));
        }
        if (credits != null) {
            credits.forEach(i -> i.setUserAccount(this));
        }
        this.credits = credits;
    }

    public UserAccount credits(Set<Credit> credits) {
        this.setCredits(credits);
        return this;
    }

    public UserAccount addCredit(Credit credit) {
        this.credits.add(credit);
        credit.setUserAccount(this);
        return this;
    }

    public UserAccount removeCredit(Credit credit) {
        this.credits.remove(credit);
        credit.setUserAccount(null);
        return this;
    }

    public Entreprise getEntreprise() {
        return this.entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public UserAccount entreprise(Entreprise entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    public PointOfSale getPointOfSale() {
        return this.pointOfSale;
    }

    public void setPointOfSale(PointOfSale pointOfSale) {
        this.pointOfSale = pointOfSale;
    }

    public UserAccount pointOfSale(PointOfSale pointOfSale) {
        this.setPointOfSale(pointOfSale);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAccount)) {
            return false;
        }
        return id != null && id.equals(((UserAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserAccount{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", role='" + getRole() + "'" +
            ", telephone='" + getTelephone() + "'" +
            "}";
    }
}
