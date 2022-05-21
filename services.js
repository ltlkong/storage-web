dynamicallyLoadScript(
  "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js",
);

function dynamicallyLoadScript(url) {
  var script = document.createElement("script");
  script.src = url;

  document.head.appendChild(script);
}

function baseApiCall(settings, success, fail) {
  const apiCall = $.ajax(settings);

  apiCall.done(success);

  apiCall.fail(fail);
}

const baseUrl = "https://ltl.ngrok.io";

function isUserLoggedIn(success, fail) {
  var settings = {
    url: baseUrl + "/user",
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: Cookies.get("auth_token"),
    },
  };

  baseApiCall(settings, success, fail);
}

function getServices(success, fail) {
  var settings = {
    url: baseUrl + "/service",
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: Cookies.get("auth_token"),
    },
  };

  baseApiCall(settings, success, fail);
}

function createService(data, success, fail) {
  var settings = {
    url: baseUrl + "/service",
    method: "POST",
    timeout: 0,
    headers: {
      Authorization: Cookies.get("auth_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  baseApiCall(settings, success, fail);
}

function createFileLink(key, isInternal) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (isInternal) {
    return `${baseUrl}/file/${key}?key=${urlParams.get("key")}`;
  }
  return `${baseUrl}/public/file/${key}`;
}

function uploadFile(file, apiKey, storage, previousFileKey, success, fail) {
  const form = new FormData();
  form.append("file", file);
  if (previousFileKey) {
    form.append("previous_file_key", previousFileKey);
  }

  const settings = {
    url: baseUrl + `/file?key=${apiKey}&storage_id=${storage}`,
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
    dataType: "json",
  };

  baseApiCall(settings, success, fail);
}

function getStorages(success, fail) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const settings = {
    url: baseUrl + "/storage?key=" + urlParams.get("key"),
    method: "GET",
    timeout: 0,
  };

  baseApiCall(settings, success, fail);
}

function createStorage(data, success, fail) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const settings = {
    url: baseUrl + "/storage?key=" + urlParams.get("key"),
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      type: "server",
      ...data,
    }),
  };
  baseApiCall(settings, success, fail);
}

function getFileObjects(fileType, filePublicKey, storageId, success, fail) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const settings = {
    url:
      baseUrl +
      `/file?storage_id=${storageId}&key=${urlParams.get("key")}&${
        fileType ? "type=" + fileType : ""
      }&${filePublicKey ? "public_key=" + filePublicKey : ""}`,
    method: "GET",
    timeout: 0,
  };

  baseApiCall(settings, success, fail);
}
