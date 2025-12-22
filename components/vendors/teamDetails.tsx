import { Star } from 'lucide-react'
import React from 'react'

const TeamDetails = ({venueData}: any) => {
  return (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Team</h2>
                <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
                  See all
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {venueData.team.slice(0, 6).map((member: any) => (
                  <div key={member.id} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                      />
                      {member.rating > 0 && (
                        <div className="absolute -bottom-1 right-5 bg-white rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1 shadow-md">
                          {member.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

  )
}

export default TeamDetails