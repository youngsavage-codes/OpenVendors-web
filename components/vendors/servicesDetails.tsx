import React from 'react'

const ServicesDetails = ({categories, setSelectedCategory, selectedCategory, filteredServices}: any) => {
  return (
         <section>
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              
              {/* Category Pills */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((cat: any) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-black text-white' 
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service List */}
              <div className="space-y-4">
                {filteredServices.map((service: any) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border-2 border-[#E9EBEC] rounded-xl">
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-gray-600 text-sm">{service.duration}</p>
                      <p className="font-bold mt-1">{service.price}</p>
                    </div>
                    <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 font-medium">
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </section>

  )
}

export default ServicesDetails