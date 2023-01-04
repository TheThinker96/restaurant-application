package com.chad.restaurant.service.dto;

import com.chad.restaurant.domain.enumeration.EntrepriseStatut;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.chad.restaurant.domain.Entreprise} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntrepriseDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 60)
    private String name;

    @NotNull
    @Size(min = 4, max = 60)
    private String responsable;

    @Size(min = 4, max = 120)
    private String adresse;

    @NotNull
    @Size(min = 4, max = 60)
    private String telephones;

    private EntrepriseStatut statut;

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

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephones() {
        return telephones;
    }

    public void setTelephones(String telephones) {
        this.telephones = telephones;
    }

    public EntrepriseStatut getStatut() {
        return statut;
    }

    public void setStatut(EntrepriseStatut statut) {
        this.statut = statut;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntrepriseDTO)) {
            return false;
        }

        EntrepriseDTO entrepriseDTO = (EntrepriseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entrepriseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntrepriseDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", telephones='" + getTelephones() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
