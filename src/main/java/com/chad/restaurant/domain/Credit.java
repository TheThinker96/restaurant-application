package com.chad.restaurant.domain;

import com.chad.restaurant.domain.enumeration.CreditStatut;
import com.chad.restaurant.domain.enumeration.CreditType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Credit.
 */
@Entity
@Table(name = "credit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Credit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "solde", precision = 21, scale = 2)
    private BigDecimal solde;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private CreditType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private CreditStatut statut;

    @ManyToOne
    @JsonIgnoreProperties(value = { "venteProduits", "credits", "entreprise", "pointOfSale" }, allowSetters = true)
    private UserAccount userAccount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Credit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getSolde() {
        return this.solde;
    }

    public Credit solde(BigDecimal solde) {
        this.setSolde(solde);
        return this;
    }

    public void setSolde(BigDecimal solde) {
        this.solde = solde;
    }

    public CreditType getType() {
        return this.type;
    }

    public Credit type(CreditType type) {
        this.setType(type);
        return this;
    }

    public void setType(CreditType type) {
        this.type = type;
    }

    public CreditStatut getStatut() {
        return this.statut;
    }

    public Credit statut(CreditStatut statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(CreditStatut statut) {
        this.statut = statut;
    }

    public UserAccount getUserAccount() {
        return this.userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Credit userAccount(UserAccount userAccount) {
        this.setUserAccount(userAccount);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Credit)) {
            return false;
        }
        return id != null && id.equals(((Credit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Credit{" +
            "id=" + getId() +
            ", solde=" + getSolde() +
            ", type='" + getType() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
