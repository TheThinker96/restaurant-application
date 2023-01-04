package com.chad.restaurant.service.dto;

import com.chad.restaurant.domain.enumeration.Role;
import com.chad.restaurant.domain.enumeration.Sexe;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.chad.restaurant.domain.UserAccount} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserAccountDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 60)
    private String nom;

    @NotNull
    @Size(min = 4, max = 60)
    private String prenom;

    private Sexe sexe;

    private Role role;

    @NotNull
    @Size(min = 8, max = 30)
    private String telephone;

    private EntrepriseDTO entreprise;

    private PointOfSaleDTO pointOfSale;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public EntrepriseDTO getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(EntrepriseDTO entreprise) {
        this.entreprise = entreprise;
    }

    public PointOfSaleDTO getPointOfSale() {
        return pointOfSale;
    }

    public void setPointOfSale(PointOfSaleDTO pointOfSale) {
        this.pointOfSale = pointOfSale;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAccountDTO)) {
            return false;
        }

        UserAccountDTO userAccountDTO = (UserAccountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, userAccountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserAccountDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", role='" + getRole() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", entreprise=" + getEntreprise() +
            ", pointOfSale=" + getPointOfSale() +
            "}";
    }
}
