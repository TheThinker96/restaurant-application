package com.chad.restaurant.domain;

import com.chad.restaurant.domain.enumeration.VenteStatut;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A VenteProduit.
 */
@Entity
@Table(name = "vente_produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VenteProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "quantite", nullable = false)
    private Integer quantite;

    @NotNull
    @Column(name = "prix", precision = 21, scale = 2, nullable = false)
    private BigDecimal prix;

    @Column(name = "date_vente")
    private Instant dateVente;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private VenteStatut statut;

    @ManyToOne
    @JsonIgnoreProperties(value = { "stockProduits", "venteProduits", "section", "entreprise" }, allowSetters = true)
    private Produit produit;

    @ManyToOne
    @JsonIgnoreProperties(value = { "venteProduits", "produit" }, allowSetters = true)
    private StockProduit stockProduit;

    @ManyToOne
    @JsonIgnoreProperties(value = { "venteProduits", "credits", "entreprise", "pointOfSale" }, allowSetters = true)
    private UserAccount userAccount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public VenteProduit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return this.quantite;
    }

    public VenteProduit quantite(Integer quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrix() {
        return this.prix;
    }

    public VenteProduit prix(BigDecimal prix) {
        this.setPrix(prix);
        return this;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Instant getDateVente() {
        return this.dateVente;
    }

    public VenteProduit dateVente(Instant dateVente) {
        this.setDateVente(dateVente);
        return this;
    }

    public void setDateVente(Instant dateVente) {
        this.dateVente = dateVente;
    }

    public VenteStatut getStatut() {
        return this.statut;
    }

    public VenteProduit statut(VenteStatut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(VenteStatut statut) {
        this.statut = statut;
    }

    public Produit getProduit() {
        return this.produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public VenteProduit produit(Produit produit) {
        this.setProduit(produit);
        return this;
    }

    public StockProduit getStockProduit() {
        return this.stockProduit;
    }

    public void setStockProduit(StockProduit stockProduit) {
        this.stockProduit = stockProduit;
    }

    public VenteProduit stockProduit(StockProduit stockProduit) {
        this.setStockProduit(stockProduit);
        return this;
    }

    public UserAccount getUserAccount() {
        return this.userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public VenteProduit userAccount(UserAccount userAccount) {
        this.setUserAccount(userAccount);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VenteProduit)) {
            return false;
        }
        return id != null && id.equals(((VenteProduit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VenteProduit{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prix=" + getPrix() +
            ", dateVente='" + getDateVente() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
