require "test_helper"

class ServiceDocumentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @service_document = service_documents(:one)
  end

  test "should get index" do
    get service_documents_url, as: :json
    assert_response :success
  end

  test "should create service_document" do
    assert_difference("ServiceDocument.count") do
      post service_documents_url, params: { service_document: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show service_document" do
    get service_document_url(@service_document), as: :json
    assert_response :success
  end

  test "should update service_document" do
    patch service_document_url(@service_document), params: { service_document: {  } }, as: :json
    assert_response :success
  end

  test "should destroy service_document" do
    assert_difference("ServiceDocument.count", -1) do
      delete service_document_url(@service_document), as: :json
    end

    assert_response :no_content
  end
end
