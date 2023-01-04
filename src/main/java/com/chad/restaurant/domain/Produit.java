package com.chad.restaurant.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Produit implements Serializable {

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
    @Column(name = "price", precision = 21, scale = 2, nullable = false)
    private BigDecimal price;

    @OneToMany(mappedBy = "produit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "venteProduits", "produit" }, allowSetters = true)
    private Set<StockProduit> stockProduits = new HashSet<>();

    @OneToMany(mappedBy = "produit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produit", "stockProduit", "userAccount" }, allowSetters = true)
    private Set<VenteProduit> venteProduits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "produits", "entreprise" }, allowSetters = true)
    private Section section;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pointOfSales", "sections", "produits", "userAccounts" }, allowSetters = true)
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Produit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Produit name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Produit price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Set<StockProduit> getStockProduits() {
        return this.stockProduits;
    }

    public void setStockProduits(Set<StockProduit> stockProduits) {
        if (this.stockProduits != null) {
            this.stockProduits.forEach(i -> i.setProduit(null));
        }
        if (stockProduits != null) {
            stockProduits.forEach(i -> i.setProduit(this));
        }
        this.stockProduits = stockProduits;
    }

    public Produit stockProduits(Set<StockProduit> stockProduits) {
        this.setStockProduits(stockProduits);
        return this;
    }

    public Produit addStockProduit(StockProduit stockProduit) {
        this.stockProduits.add(stockProduit);
        stockProduit.setProduit(this);
        return this;
    }

    public Produit removeStockProduit(StockProduit stockProduit) {
        this.stockProduits.remove(stockProduit);
        stockProduit.setProduit(null);
        return this;
    }

    public Set<VenteProduit> getVenteProduits() {
        return this.venteProduits;
    }

    public void setVenteProduits(Set<VenteProduit> venteProduits) {
        if (this.venteProduits != null) {
            this.venteProduits.forEach(i -> i.setProduit(null));
        }
        if (venteProduits != null) {
            venteProduits.forEach(i -> i.setProduit(this));
        }
        this.venteProduits = venteProduits;
    }

    public Produit venteProduits(Set<VenteProduit> venteProduits) {
        this.setVenteProduits(venteProduits);
        return this;
    }

    public Produit addVenteProduit(VenteProduit venteProduit) {
        this.venteProduits.add(venteProduit);
        venteProduit.setProduit(this);
        return this;
    }

    public Produit removeVenteProduit(VenteProduit venteProduit) {
        this.venteProduits.remove(venteProduit);
        venteProduit.setProduit(null);
        return this;
    }

    public Section getSection() {
        return this.section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Produit section(Section section) {
        this.setSection(section);
        return this;
    }

    public Entreprise getEntreprise() {
        return this.entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public Produit entreprise(Entreprise entreprise) {
        this.setEntreprise(entreprise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return id != null && id.equals(((Produit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
