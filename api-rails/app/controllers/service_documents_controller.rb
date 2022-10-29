class ServiceDocumentsController < ApplicationController
  before_action :set_service_document, only: %i[ show update destroy ]

  # GET /service_documents
  def index
    @service_documents = ServiceDocument.all

    render json: @service_documents, include: [:prestador, :tomador], except: [:user_id, :tomador_id]
  end

  # GET /service_documents/1
  def show
    render json: @service_document, include: [:prestador, :tomador], except: [:user_id, :tomador_id]
  end

  # POST /service_documents
  def create
    @service_document = ServiceDocument.new(service_document_params)

    if @service_document.save
      render json: @service_document, include: [:prestador, :tomador], except: [:user_id, :tomador_id], status: :created, location: @service_document
    else
      render json: @service_document.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /service_documents/1
  def update
    if @service_document.update(service_document_params)
      render json: @service_document
    else
      render json: @service_document.errors, status: :unprocessable_entity
    end
  end

  # DELETE /service_documents/1
  def destroy
    @service_document.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_service_document
      @service_document = ServiceDocument.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def service_document_params
      params.require(:service_document).permit(:user_id, :tomador_id)
    end
end
