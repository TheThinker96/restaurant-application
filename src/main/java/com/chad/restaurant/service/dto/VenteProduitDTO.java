package com.chad.restaurant.service.dto;

import com.chad.restaurant.domain.enumeration.VenteStatut;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.chad.restaurant.domain.VenteProduit} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VenteProduitDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer quantite;

    @NotNull
    private BigDecimal prix;

    private Instant dateVente;

    private VenteStatut statut;

    private ProduitDTO produit;

    private StockProduitDTO stockProduit;

    private UserAccountDTO userAccount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Instant getDateVente() {
        return dateVente;
    }

    public void setDateVente(Instant dateVente) {
        this.dateVente = dateVente;
    }

    public VenteStatut getStatut() {
        return statut;
    }

    public void setStatut(VenteStatut statut) {
        this.statut = statut;
    }

    public ProduitDTO getProduit() {
        return produit;
    }

    public void setProduit(ProduitDTO produit) {
        this.produit = produit;
    }

    public StockProduitDTO getStockProduit() {
        return stockProduit;
    }

    public void setStockProduit(StockProduitDTO stockProduit) {
        this.stockProduit = stockProduit;
    }

    public UserAccountDTO getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccountDTO userAccount) {
        this.userAccount = userAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VenteProduitDTO)) {
            return false;
        }

        VenteProduitDTO venteProduitDTO = (VenteProduitDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, venteProduitDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VenteProduitDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prix=" + getPrix() +
            ", dateVente='" + getDateVente() + "'" +
            ", statut='" + getStatut() + "'" +
            ", produit=" + getProduit() +
            ", stockProduit=" + getStockProduit() +
            ", userAccount=" + getUserAccount() +
            "}";
    }
}
