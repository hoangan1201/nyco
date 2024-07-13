import React from 'react';
import _ from 'lodash';

export const isClient = typeof window !== 'undefined';
export const isProduction = process.env.NODE_ENV === 'production';

// Gets the display name of a JSX component for dev tools
export function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export const generateUniqueId = (props) => {
  let id = '';

  Object.keys(props).forEach((prop) => {
    id += `${props[prop]}-`;
  });

  id += `${Math.floor(Math.random() * 0xFFFF)}`;

  id = id.replace(/[^A-Za-z0-9-]/gi, '');

  return id;
};

export const convertToTimestamp = ({ data }) => ({
  ...data,
  series: data.series.map(item => ({
    ...item,
    data: item.data.map(entry => [
      new Date(entry.time).getTime(),
      entry.value,
    ]),
  })),
});

export const extractAndConvertDataBasedOnTimeScale = ({ data, timeScale }) => {
  const categories = [];
  const newData = {
    ...data,
    series: data.series.map(item => ({
      ...item,
      data: item.values.filter(i => i.type === timeScale).map((value) => {
        categories.push(value.label);
        return value.value;
      }),
    })),
  };

  const uniqCategories = _.uniq(categories);

  return {
    ...newData,
    xAxis: {
      ...newData.xAxis,
      categories: uniqCategories.sort(),
    },
    plotOptions: {
      ...newData.plotOptions,
      series: {
        // we have an "invisible" border so add 2 for consistency
        // pointWidth: (300 / uniqCategories.length) + 2,
      },
    },
  };
};

export const getCookie = (name) => {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(`${name}=`));
  if (xsrfCookies.length === 0) {
    return null;
  }

  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
};

// Detects if an event is a keydown and either an enter or space bar press
export const detectActivationEvent = (event) => {
  if (event && event.type === 'keydown') {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return false;
    }
  }
  return true;
};

export const setLabels = ({
  data,
  selected,
}) => Object.keys(data).map((label) => {
  const children = data[label].map((child) => {
    const entries = Object.entries(child);
    return {
      value: entries[0][0],
      label: entries[0][1],
      selected,
    };
  });
  return {
    label,
    children,
  };
});

export const handleDownload = ({ svg, csv, filename, tableRef }) => {
  const friendlyFilename = filename.replace(/ /g, '-').toLowerCase();
  const timestamp = new Date().toISOString().substr(0, 10);
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });

  const el = document.createElement('a');
  const href = svg
    ? `${URL.createObjectURL(svgBlob)}`
    : `data:application/octet-stream,${encodeURIComponent(generateCsv(csv))}`;
  el.setAttribute('href', href);
  const ext = svg
    ? 'svg'
    : 'csv';
  el.setAttribute('download', `WPD_${timestamp}_${friendlyFilename}.${ext}`);
  // el.style.display = 'none';
  el.innerHTML = '';
  el.style='display:none;'
  // document.body.appendChild(el);
  el.click();
  if (svg) downloadSvg(svg, filename);
  // document.body.removeChild(el);
};
const generateCsv = (ref) => {
       var csv = [];
    var rows = ref.current ? ref.current.querySelectorAll("table tr") : ref.querySelectorAll("table tr");;

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(`"${cols[j].innerText}"`);

        csv.push(row.join(","));
    }
    return csv.join("\n")
  }

function copyStylesInline(destinationNode, sourceNode) {
  const containerElements = ['svg', 'g'];
  for (let cd = 0; cd < destinationNode.childNodes.length; cd++) {
    const child = destinationNode.childNodes[cd];
    if (containerElements.indexOf(child.tagName) != -1) {
      copyStylesInline(child, sourceNode.childNodes[cd]);
      continue;
    }
    const style = sourceNode.childNodes[cd].currentStyle || window.getComputedStyle(sourceNode.childNodes[cd]);
    if (style == 'undefined' || style == null) continue;
    for (let st = 0; st < style.length; st++) {
      child.style.setProperty(style[st], style.getPropertyValue(style[st]));
    }
  }
}

function triggerDownload(imgURI, fileName) {
  const evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true,
  });
  const a = document.createElement('a');
  a.setAttribute('download', fileName);
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');
  a.dispatchEvent(evt);
}

function downloadSvg(svg, fileName) {
  const copy = svg.cloneNode(true);
  copyStylesInline(copy, svg);
  const canvas = document.createElement('canvas');
  const bbox = svg.getBBox();
  canvas.width = bbox.width;
  canvas.height = bbox.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, bbox.width, bbox.height);
  const data = (new XMLSerializer()).serializeToString(copy);
  const DOMURL = window.URL || window.webkitURL || window;
  const img = new Image();
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = DOMURL.createObjectURL(svgBlob);
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
    if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
      const blob = canvas.msToBlob();
      navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      triggerDownload(imgURI, fileName);
    }
    document.removeChild(canvas);
  };
  img.src = url;
}

export const contentWrapper = ({ contents }) => contents.map((content) => {
  if (content.type === 'wysiwyg') {
    const divWrapper = <div dangerouslySetInnerHTML={{ __html: content.content }} />;

    return { ...content, content: divWrapper };
  }

  return content;
});

export const formatNavData = ({ contents }) => contents.filter(t => t.title).map(({ title }) => ({
  url: `#${encodeURIComponent(title)}`,
  label: title,
}));

export default generateUniqueId;

export const getRandomColors = (colors, count) => {
  let _arr = [...colors];
  return[...Array(count)].map( ()=> _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0] );
}

export const quartersAvailableForYear = (year, quarterStrings) => {
  return quarterStrings.filter(
    quarterString => (quarterString.split('-Q')[0] == year)
  ).map(
    quarterString => parseInt(quarterString.split('-Q')[1]) - 1
  )
}

export const keyValuePairs = (values, pushOther = false) => {
  if (values.length > 0 && typeof values[0] === 'string') {
    // Transforms an array of string values into an array of key-value objects
    if (pushOther && !values.includes('Other')) {
      values.push('Other')
    }
    
    return values.map(value => {
      return {
        key: value,
        value: value
      }
    })
  } else {
    // Assuming `values` is already a list of key-value pairs due to proptypes check
    if (pushOther && !values.find(val => val.key == 'Other')) {
      values.push({ key: 'Other', value: 'Other' })
    }

    return values;
  }
}

export const explodeQuarterString = (quarterString) => {
  // Returns { year: '2017', quarter: 'Q1' } from '2017-Q1'
  const [ year, quarter ] = quarterString.split('-')
  return { year, quarter }
}

export const joinQuarterString = (year, quarter) => `${year}-${quarter}`; // ...and vice versa

export const decodeHTML = (string) => {
  let tempTextarea = document.createElement('textarea');
  tempTextarea.innerHTML = string;
  return tempTextarea.value;
}

export const scrollIntoViewWithOffset = (element, pixelOffset) => {
  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY + pixelOffset,
    behavior: 'smooth'
  });
}

export const downloadExportedFile = (mimetype, filename, data) => {
  // Create a temporary element that downloads the given file on click
  const downloadLink = document.createElement("a");

  // The export server encodes PDF as a buffer, SVGs as XML, and images as base 64
  if (data.buffer && data.buffer.data) {
    let blob = new Blob([ new Uint8Array(data.buffer.data) ], { type: mimetype });
    downloadLink.href = URL.createObjectURL(blob);
  } else if (data.xml) {
    let svgBlob = new Blob([ data.xml ], { type:"image/svg+xml;charset=utf-8" });
    downloadLink.href = URL.createObjectURL(svgBlob);
  } else {
    downloadLink.href = `data:${mimetype};base64,${data.base64}`;
  }

  downloadLink.download = filename;
  
  // Appending to body is only necessary for some versions of Firefox
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  downloadLink.remove();
}