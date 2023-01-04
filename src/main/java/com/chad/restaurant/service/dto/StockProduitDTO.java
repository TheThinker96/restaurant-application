package com.chad.restaurant.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.chad.restaurant.domain.StockProduit} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StockProduitDTO implements Serializable {

    private Long id;

    private String name;

    private Integer quantite;

    private Instant dateExpiration;

    private ProduitDTO produit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Instant getDateExpiration() {
        return dateExpiration;
    }

    public void setDateExpiration(Instant dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    public ProduitDTO getProduit() {
        return produit;
    }

    public void setProduit(ProduitDTO produit) {
        this.produit = produit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockProduitDTO)) {
            return false;
        }

        StockProduitDTO stockProduitDTO = (StockProduitDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, stockProduitDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StockProduitDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantite=" + getQuantite() +
            ", dateExpiration='" + getDateExpiration() + "'" +
            ", produit=" + getProduit() +
            "}";
    }
}
