package com.dilupa.assingment.cityservice.service;

import com.dilupa.assingment.cityservice.entity.City;
import com.dilupa.assingment.cityservice.exception.ResourceNotFoundException;
import com.dilupa.assingment.cityservice.repository.CityRepository;
import com.dilupa.assingment.cityservice.util.ValidationUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
class CityServiceImplTest {

    @MockBean
    CityRepository cityRepository;

    @Autowired
    ICityService cityService;

    String TEST_URL = "https://t4.ftcdn.net/jpg/02/26/76/09/360_F_226760954_HnzqHSCZSfd6ml7i3NfcagAxzIlU6uiD.jpg";

    @BeforeEach
    void setUp() {
        City city = new City();
        city.setId(1);
        city.setName("Colombo");
        city.setPhoto(TEST_URL);

        Mockito.when(cityRepository.findById(1)).thenReturn(Optional.ofNullable(city));

        Mockito.when(cityRepository.findById(1)).thenReturn(Optional.ofNullable(city));
    }

    @Test
    @DisplayName("Get city base on valid city ID")
    void whereGivenValidCityId_thenCityShouldFound() throws Exception {
        City city = new City();
        city.setId(1);
        city.setName("Colombo");
        city.setPhoto(TEST_URL);

        City cityLoaded = cityService.loadCityById(1);

        assertEquals("Colombo", cityLoaded.getName());
        assertEquals(TEST_URL, cityLoaded.getPhoto());
    }

    @Test()
    @DisplayName("Get not found exception base on invalid City ID")
    void whereInvalidCityId_thenCityNotFoundException() throws Exception {
        Mockito.when(cityRepository.findById(1)).thenReturn(Optional.ofNullable(null));
        ResourceNotFoundException cityNotFoundException = assertThrows(ResourceNotFoundException.class,
                () -> cityService.loadCityById(1));

        assertEquals("City not found with ID : '1'", cityNotFoundException.getMessage());
    }


    @Test
    @DisplayName("Given valid city ID and data the city should update")
    void whereGivenValidCityIdAndCityDataToUpdate_thenCityShouldUpdate() throws Exception {
        City city = new City();
        city.setId(1);
        city.setName("Colombo");
        city.setPhoto(TEST_URL);
        Mockito.when(cityRepository.save(any())).thenReturn(city);
        City cityLoaded = cityService.updateCityById(1, city);

        assertEquals("Colombo", cityLoaded.getName());
        assertEquals(TEST_URL, cityLoaded.getPhoto());
    }


    @Test()
    @DisplayName("Get not found exception when try to update City with invalid City ID")
    void whereTryToUpdateCityWithInvalidCityID_thenCityNotFoundException() throws Exception {

        City city = new City();
        city.setId(1);
        city.setName("Colombo");
        city.setPhoto(TEST_URL);
        Mockito.when(cityRepository.findById(11)).thenReturn(Optional.ofNullable(null));

        ResourceNotFoundException userNotFoundException = assertThrows(ResourceNotFoundException.class,
                () -> cityService.updateCityById(11, city));

        assertEquals("City not found with ID : '11'", userNotFoundException.getMessage());
    }


    @Test
    @DisplayName("Get city list when getAll cities")
    void whereFindAllCities_thenCityListShouldReturn() throws Exception {
        City city = new City();
        city.setId(1);
        city.setName("Colombo");
        city.setPhoto(TEST_URL);

        List<City> cityList = new ArrayList<>(Arrays.asList(city));
        Mockito.when(cityRepository.findAll()).thenReturn(cityList);

        List<City> cityListFound = cityService.getAll();

        assertEquals("Colombo", cityListFound.get(0).getName());
        assertEquals(TEST_URL, cityListFound.get(0).getPhoto());
    }


    @Test
    @DisplayName("Validate image URL regex is working fine")
    void givenValidURL_thenValidationShouldReturnTrue() {
        String URL = "http://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tiananmen_Gate.jpg/500px-Tiananmen_Gate.jpg";
        Boolean dd = ValidationUtil.validateUrl(URL);
        System.out.println(dd);
        assertEquals(true, dd);
    }
}