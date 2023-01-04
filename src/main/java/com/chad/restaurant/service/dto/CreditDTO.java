package com.chad.restaurant.service.dto;

import com.chad.restaurant.domain.enumeration.CreditStatut;
import com.chad.restaurant.domain.enumeration.CreditType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.chad.restaurant.domain.Credit} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CreditDTO implements Serializable {

    private Long id;

    private BigDecimal solde;

    private CreditType type;

    private CreditStatut statut;

    private UserAccountDTO userAccount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getSolde() {
        return solde;
    }

    public void setSolde(BigDecimal solde) {
        this.solde = solde;
    }

    public CreditType getType() {
        return type;
    }

    public void setType(CreditType type) {
        this.type = type;
    }

    public CreditStatut getStatut() {
        return statut;
    }

    public void setStatut(CreditStatut statut) {
        this.statut = statut;
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
        if (!(o instanceof CreditDTO)) {
            return false;
        }

        CreditDTO creditDTO = (CreditDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, creditDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CreditDTO{" +
            "id=" + getId() +
            ", solde=" + getSolde() +
            ", type='" + getType() + "'" +
            ", statut='" + getStatut() + "'" +
            ", userAccount=" + getUserAccount() +
            "}";
    }
}
