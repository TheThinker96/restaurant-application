package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Entreprise;
import com.chad.restaurant.domain.Section;
import com.chad.restaurant.service.dto.EntrepriseDTO;
import com.chad.restaurant.service.dto.SectionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Section} and its DTO {@link SectionDTO}.
 */
@Mapper(componentModel = "spring")
public interface SectionMapper extends EntityMapper<SectionDTO, Section> {
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    SectionDTO toDto(Section s);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);
}
