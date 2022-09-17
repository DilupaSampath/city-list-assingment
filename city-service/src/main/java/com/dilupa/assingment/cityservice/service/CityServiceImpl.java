package com.dilupa.assingment.cityservice.service;

import com.dilupa.assingment.cityservice.entity.City;
import com.dilupa.assingment.cityservice.exception.ResourceNotFoundException;
import com.dilupa.assingment.cityservice.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements ICityService {

    @Autowired
    private CityRepository cityRepository;


    /**
     * Load city by given city ID
     * @param id - city ID
     * @return
     * @throws Exception
     */
    public City loadCityById(int id) throws Exception {

        Optional<City> optionalCity = cityRepository.findById(id);

        optionalCity.orElseThrow(() -> new ResourceNotFoundException("City", "ID", id));

        return optionalCity.get();
    }

    /**
     * Update the city by given city ID
     * @param id - city OD
     * @param city - valid city
     * @return
     * @throws Exception
     */
    public City updateCityById(int id, City city) throws Exception {


        City existingCity = cityRepository.findById(id).orElse(null);

        if (existingCity != null) {
            if (Optional.ofNullable(city.getName()).isPresent()) {
                existingCity.setName(city.getName());
            }
            if (Optional.ofNullable(city.getPhoto()).isPresent()) {
                existingCity.setPhoto(city.getPhoto());
            }
            return cityRepository.save(existingCity);
        } else {
            throw new ResourceNotFoundException("City", "ID", id);
        }
    }

    /**
     * Get all cities
     * @return
     * @throws Exception
     */
    public List<City> getAll() throws Exception {
        return cityRepository.findAll();
    }

    /**
     * Load cities with pagination
     * @param offset
     * @param pageSize
     * @return
     * @throws Exception
     */
    public Page<City> getAllWithPagination(int offset, int pageSize) throws Exception {
        Page<City> cityPage = cityRepository.findAll(PageRequest.of(offset, pageSize));
        return cityPage;
    }
}
