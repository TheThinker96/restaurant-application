package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Entreprise;
import com.chad.restaurant.domain.Produit;
import com.chad.restaurant.domain.Section;
import com.chad.restaurant.service.dto.EntrepriseDTO;
import com.chad.restaurant.service.dto.ProduitDTO;
import com.chad.restaurant.service.dto.SectionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produit} and its DTO {@link ProduitDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProduitMapper extends EntityMapper<ProduitDTO, Produit> {
    @Mapping(target = "section", source = "section", qualifiedByName = "sectionId")
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    ProduitDTO toDto(Produit s);

    @Named("sectionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SectionDTO toDtoSectionId(Section section);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);
}
