import {
  ADD_GENERIC_PAGE,
  GENERIC_PAGE_API_REQUEST,
  GENERIC_PAGE_API_SUCCESS,
  GENERIC_PAGE_API_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  data: {},
  errors: [],
  isFetching: true,
  contents: [
    {
      title: "Department of Parks and Recreation",
      type: "wysiwyg",
      content: "<p>NYC Parks considers a transitional employee as a client when s/he completed Orientation and Basic Training. All clients referred for employment in POP are sent exclusively by NYC HRA, and they must maintain open and active Public Assistance cases for the duration of transitional employment. After hire, clients are employed by Parks, and if they lose eligibility, resign and/or are terminated they can no longer be serviced by Parks."
    }, {
      title: "Human Resources Administration",
      type: "wysiwyg",
      content: "<p>This chart compares two metrics: the number of times an individual engaged with programs and their earnings. Clita accusata volutpat ei mel, sumo pertinax intellegat ea pri, sanctus suscipit vel ad. Laudem soluta constituam mea ex. Et mel fabellas postulant consetetur. No nonumes delectus disputationi vix, maluisset voluptatum suscipiantur vim et. Ut erat salutandi sed, debet alterum volutpat ad has. Duo id numquam necessitatibus, oporteat convenire usu ad. Eam ut tale indoctum dissentias, ea accusata torquatos vim. Et sea etiam tantas mollis. Nam cu semper expetendis. Duo an justo viris urbanitas, sea perfecto inimicus democritum tantas.</p>"
    }, {
      title: "First Image",
      type: "image",
      alt: "alt text",
      src: "https://staging-media-socindicrep.s3.amazonaws.com/media/filer_public/c9/1d/c91df320-2e4a-44b5-ae92-0f392bde7ecb/neighborhood_safety_mocj.jpg",
      caption: "Successful completion of academic programs leads to better employment outcomes. Photo caption style Lato 14/20pt. Image ratio 16:9.",
    }, {
      title: "Explore Service Locations Data",
      type: "embed",
      embed_code: "<div class='tableauPlaceholder' id='viz1604685418123' style='position: relative'><noscript><a href='https:&#47;&#47;www1.nyc.gov&#47;'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;G9&#47;G98NC8JG9&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='shared&#47;G98NC8JG9' /> <param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;G9&#47;G98NC8JG9&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='tabs' value='no' /><param name='language' value='en' /></object></div><script type='text/javascript'>var divElement = document.getElementById('viz1604685418123'); var vizElement = divElement.getElementsByTagName('object')[0]; vizElement.style.width='800px';vizElement.style.height='527px'; var scriptElement = document.createElement('script'); scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'; vizElement.parentNode.insertBefore(scriptElement, vizElement);</script>"
    },
  ]
};

export default function genericPage(state = initialState, action) {
  switch (action.type) {
    case ADD_GENERIC_PAGE: {
      const { data } = action.payload;
      return {
        ...state,
        data,
        contents: data.contents,
        isFetching: false,
        error: [],
      };
    }
    case GENERIC_PAGE_API_REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: [],
      };
    case GENERIC_PAGE_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: [],
      };
    case GENERIC_PAGE_API_FAILURE: {
      const { errors } = action;

      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    default:
      return state;
  }
}
