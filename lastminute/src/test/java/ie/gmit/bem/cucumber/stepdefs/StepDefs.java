package ie.gmit.bem.cucumber.stepdefs;

import ie.gmit.bem.LastminuteApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = LastminuteApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
