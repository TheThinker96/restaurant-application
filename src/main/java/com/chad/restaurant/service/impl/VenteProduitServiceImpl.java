package com.chad.restaurant.service.impl;

import com.chad.restaurant.domain.VenteProduit;
import com.chad.restaurant.repository.VenteProduitRepository;
import com.chad.restaurant.service.VenteProduitService;
import com.chad.restaurant.service.dto.VenteProduitDTO;
import com.chad.restaurant.service.mapper.VenteProduitMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link VenteProduit}.
 */
@Service
@Transactional
public class VenteProduitServiceImpl implements VenteProduitService {

    private final Logger log = LoggerFactory.getLogger(VenteProduitServiceImpl.class);

    private final VenteProduitRepository venteProduitRepository;

    private final VenteProduitMapper venteProduitMapper;

    public VenteProduitServiceImpl(VenteProduitRepository venteProduitRepository, VenteProduitMapper venteProduitMapper) {
        this.venteProduitRepository = venteProduitRepository;
        this.venteProduitMapper = venteProduitMapper;
    }

    @Override
    public VenteProduitDTO save(VenteProduitDTO venteProduitDTO) {
        log.debug("Request to save VenteProduit : {}", venteProduitDTO);
        VenteProduit venteProduit = venteProduitMapper.toEntity(venteProduitDTO);
        venteProduit = venteProduitRepository.save(venteProduit);
        return venteProduitMapper.toDto(venteProduit);
    }

    @Override
    public VenteProduitDTO update(VenteProduitDTO venteProduitDTO) {
        log.debug("Request to update VenteProduit : {}", venteProduitDTO);
        VenteProduit venteProduit = venteProduitMapper.toEntity(venteProduitDTO);
        venteProduit = venteProduitRepository.save(venteProduit);
        return venteProduitMapper.toDto(venteProduit);
    }

    @Override
    public Optional<VenteProduitDTO> partialUpdate(VenteProduitDTO venteProduitDTO) {
        log.debug("Request to partially update VenteProduit : {}", venteProduitDTO);

        return venteProduitRepository
            .findById(venteProduitDTO.getId())
            .map(existingVenteProduit -> {
                venteProduitMapper.partialUpdate(existingVenteProduit, venteProduitDTO);

                return existingVenteProduit;
            })
            .map(venteProduitRepository::save)
            .map(venteProduitMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<VenteProduitDTO> findAll(Pageable pageable) {
        log.debug("Request to get all VenteProduits");
        return venteProduitRepository.findAll(pageable).map(venteProduitMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VenteProduitDTO> findOne(Long id) {
        log.debug("Request to get VenteProduit : {}", id);
        return venteProduitRepository.findById(id).map(venteProduitMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete VenteProduit : {}", id);
        venteProduitRepository.deleteById(id);
    }
}
