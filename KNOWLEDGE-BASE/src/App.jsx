import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'
import HelpCentre from './pages/HelpCentre'
import SupplierQuestionnaire from './pages/SupplierQuestionnaire'
import ArticleWhatIsEnviguide from './pages/ArticleWhatIsEnviguide'
import ArticlePlatformWalkthrough from './pages/ArticlePlatformWalkthrough'
import ManualsChoice from './pages/ManualsChoice'
import AdminManuals from './pages/AdminManuals'
import ManufacturerManuals from './pages/ManufacturerManuals'
import SupplierManuals from './pages/SupplierManuals'
import ArticleGetAccess from './pages/ArticleGetAccess'
import ArticleAddProduct from './pages/ArticleAddProduct'
import ArticleCreatePCFRequest from './pages/ArticleCreatePCFRequest'
import ArticlePCFWorkflow from './pages/ArticlePCFWorkflow'
import ArticleOwnEmissions from './pages/ArticleOwnEmissions'
import ArticleComponentMaster from './pages/ArticleComponentMaster'
import ArticleDocumentMaster from './pages/ArticleDocumentMaster'
import ArticleSupplierAccess from './pages/ArticleSupplierAccess'
import ArticleCreateManufacturer from './pages/ArticleCreateManufacturer'
import ArticleCreateNewUser from './pages/ArticleCreateNewUser'
import ArticleManageAuthorizations from './pages/ArticleManageAuthorizations'
import ArticleAdminPCFWorkflow from './pages/ArticleAdminPCFWorkflow'
import ArticleDataConfiguration from './pages/ArticleDataConfiguration'
import ArticleMasterDataSetup from './pages/ArticleMasterDataSetup'
import ArticleEcoInventFactors from './pages/ArticleEcoInventFactors'

import ManufacturerQuestionnaire from './pages/ManufacturerQuestionnaire'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/help-centre" element={<HelpCentre />} />
        <Route path="/supplier-questionnaire" element={<SupplierQuestionnaire />} />
        <Route path="/manufacturer-questionnaire" element={<ManufacturerQuestionnaire />} />
        <Route path="/article-what-is-enviguide" element={<ArticleWhatIsEnviguide />} />
        <Route path="/article-platform-walkthrough" element={<ArticlePlatformWalkthrough />} />
        <Route path="/manuals-pcf" element={<ManualsChoice />} />
        <Route path="/manuals-admin" element={<AdminManuals />} />
        <Route path="/manuals-manufacturer" element={<ManufacturerManuals />} />
        <Route path="/manuals-supplier" element={<SupplierManuals />} />
        <Route path="/article-get-access" element={<ArticleGetAccess />} />
        <Route path="/article-add-product" element={<ArticleAddProduct />} />
        <Route path="/article-create-pcf-request" element={<ArticleCreatePCFRequest />} />
        <Route path="/article-pcf-workflow" element={<ArticlePCFWorkflow />} />
        <Route path="/article-own-emissions" element={<ArticleOwnEmissions />} />
        <Route path="/article-component-master" element={<ArticleComponentMaster />} />
        <Route path="/article-document-master" element={<ArticleDocumentMaster />} />
        <Route path="/article-supplier-access" element={<ArticleSupplierAccess />} />
        <Route path="/admin-article-create-manufacturer" element={<ArticleCreateManufacturer />} />
        <Route path="/admin-article-create-new-user" element={<ArticleCreateNewUser />} />
        <Route path="/admin-article-manage-authorizations" element={<ArticleManageAuthorizations />} />
        <Route path="/admin-article-add-product" element={<ArticleAddProduct />} />
        <Route path="/admin-article-pcf-workflow" element={<ArticleAdminPCFWorkflow />} />
        <Route path="/admin-article-data-config" element={<ArticleDataConfiguration />} />
        <Route path="/admin-article-master-setup" element={<ArticleMasterDataSetup />} />
        <Route path="/admin-article-ecoinvent" element={<ArticleEcoInventFactors />} />
      </Routes>
    </BrowserRouter>
  )
}

