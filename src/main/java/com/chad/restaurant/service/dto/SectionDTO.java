package com.chad.restaurant.service.dto;

import com.chad.restaurant.domain.enumeration.SectionStatut;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.chad.restaurant.domain.Section} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SectionDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 60)
    private String name;

    private SectionStatut statut;

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

    public SectionStatut getStatut() {
        return statut;
    }

    public void setStatut(SectionStatut statut) {
        this.statut = statut;
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
        if (!(o instanceof SectionDTO)) {
            return false;
        }

        SectionDTO sectionDTO = (SectionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, sectionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SectionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", statut='" + getStatut() + "'" +
            ", entreprise=" + getEntreprise() +
            "}";
    }
}
