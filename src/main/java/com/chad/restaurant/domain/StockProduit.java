package com.chad.restaurant.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StockProduit.
 */
@Entity
@Table(name = "stock_produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StockProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantite")
    private Integer quantite;

    @Column(name = "date_expiration")
    private Instant dateExpiration;

    @OneToMany(mappedBy = "stockProduit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "stockProduit", "userAccount" }, allowSetters = true)
    private Set<VenteProduit> venteProduits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "stockProduits", "venteProduits", "section", "entreprise" }, allowSetters = true)
    private Produit produit;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StockProduit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public StockProduit name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantite() {
        return this.quantite;
    }

    public StockProduit quantite(Integer quantite) {
        this.setQuantite(quantite);
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Instant getDateExpiration() {
        return this.dateExpiration;
    }

    public StockProduit dateExpiration(Instant dateExpiration) {
        this.setDateExpiration(dateExpiration);
        return this;
    }

    public void setDateExpiration(Instant dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    public Set<VenteProduit> getVenteProduits() {
        return this.venteProduits;
    }

    public void setVenteProduits(Set<VenteProduit> venteProduits) {
        if (this.venteProduits != null) {
            this.venteProduits.forEach(i -> i.setStockProduit(null));
        }
        if (venteProduits != null) {
            venteProduits.forEach(i -> i.setStockProduit(this));
        }
        this.venteProduits = venteProduits;
    }

    public StockProduit venteProduits(Set<VenteProduit> venteProduits) {
        this.setVenteProduits(venteProduits);
        return this;
    }

    public StockProduit addVenteProduit(VenteProduit venteProduit) {
        this.venteProduits.add(venteProduit);
        venteProduit.setStockProduit(this);
        return this;
    }

    public StockProduit removeVenteProduit(VenteProduit venteProduit) {
        this.venteProduits.remove(venteProduit);
        venteProduit.setStockProduit(null);
        return this;
    }

    public Produit getProduit() {
        return this.produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public StockProduit produit(Produit produit) {
        this.setProduit(produit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockProduit)) {
            return false;
        }
        return id != null && id.equals(((StockProduit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StockProduit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantite=" + getQuantite() +
            ", dateExpiration='" + getDateExpiration() + "'" +
            "}";
    }
}
