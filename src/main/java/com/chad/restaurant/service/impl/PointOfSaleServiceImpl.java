package com.chad.restaurant.service.impl;

import com.chad.restaurant.domain.PointOfSale;
import com.chad.restaurant.repository.PointOfSaleRepository;
import com.chad.restaurant.service.PointOfSaleService;
import com.chad.restaurant.service.dto.PointOfSaleDTO;
import com.chad.restaurant.service.mapper.PointOfSaleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PointOfSale}.
 */
@Service
@Transactional
public class PointOfSaleServiceImpl implements PointOfSaleService {

    private final Logger log = LoggerFactory.getLogger(PointOfSaleServiceImpl.class);

    private final PointOfSaleRepository pointOfSaleRepository;

    private final PointOfSaleMapper pointOfSaleMapper;

    public PointOfSaleServiceImpl(PointOfSaleRepository pointOfSaleRepository, PointOfSaleMapper pointOfSaleMapper) {
        this.pointOfSaleRepository = pointOfSaleRepository;
        this.pointOfSaleMapper = pointOfSaleMapper;
    }

    @Override
    public PointOfSaleDTO save(PointOfSaleDTO pointOfSaleDTO) {
        log.debug("Request to save PointOfSale : {}", pointOfSaleDTO);
        PointOfSale pointOfSale = pointOfSaleMapper.toEntity(pointOfSaleDTO);
        pointOfSale = pointOfSaleRepository.save(pointOfSale);
        return pointOfSaleMapper.toDto(pointOfSale);
    }

    @Override
    public PointOfSaleDTO update(PointOfSaleDTO pointOfSaleDTO) {
        log.debug("Request to update PointOfSale : {}", pointOfSaleDTO);
        PointOfSale pointOfSale = pointOfSaleMapper.toEntity(pointOfSaleDTO);
        pointOfSale = pointOfSaleRepository.save(pointOfSale);
        return pointOfSaleMapper.toDto(pointOfSale);
    }

    @Override
    public Optional<PointOfSaleDTO> partialUpdate(PointOfSaleDTO pointOfSaleDTO) {
        log.debug("Request to partially update PointOfSale : {}", pointOfSaleDTO);

        return pointOfSaleRepository
            .findById(pointOfSaleDTO.getId())
            .map(existingPointOfSale -> {
                pointOfSaleMapper.partialUpdate(existingPointOfSale, pointOfSaleDTO);

                return existingPointOfSale;
            })
            .map(pointOfSaleRepository::save)
            .map(pointOfSaleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PointOfSaleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PointOfSales");
        return pointOfSaleRepository.findAll(pageable).map(pointOfSaleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PointOfSaleDTO> findOne(Long id) {
        log.debug("Request to get PointOfSale : {}", id);
        return pointOfSaleRepository.findById(id).map(pointOfSaleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PointOfSale : {}", id);
        pointOfSaleRepository.deleteById(id);
    }
}
