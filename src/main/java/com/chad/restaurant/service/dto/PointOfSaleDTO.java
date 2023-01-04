package com.chad.restaurant.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.chad.restaurant.domain.PointOfSale} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PointOfSaleDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 60)
    private String name;

    @NotNull
    @Size(min = 4, max = 60)
    private String responsable;

    @NotNull
    @Size(min = 4, max = 60)
    private String adresse;

    private EntrepriseDTO entreprise;

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

    public EntrepriseDTO getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(EntrepriseDTO entreprise) {
        this.entreprise = entreprise;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PointOfSaleDTO)) {
            return false;
        }

        PointOfSaleDTO pointOfSaleDTO = (PointOfSaleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, pointOfSaleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PointOfSaleDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", responsable='" + getResponsable() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", entreprise=" + getEntreprise() +
            "}";
    }
}
